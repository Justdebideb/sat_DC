<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $orders = Order::with(['orderItems.product', 'payments'])
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
            'payment_method' => 'required|string|in:cod,bank_transfer'
        ]);

        $user = Auth::user();
        $cart = Cart::with(['cartItems.product'])->where('user_id', $user->id)->first();

        if (!$cart || $cart->cartItems->isEmpty()) {
            return response()->json(['error' => 'Cart is empty'], 400);
        }

        foreach ($cart->cartItems as $cartItem) {
            if ($cartItem->product->stock < $cartItem->quantity) {
                return response()->json([
                    'error' => 'Insufficient stock for ' . $cartItem->product->name
                ], 400);
            }
        }

        return DB::transaction(function () use ($request, $user, $cart) {
            $totalAmount = $cart->cartItems->sum(function ($cartItem) {
                return $cartItem->quantity * $cartItem->product->price;
            });

            $order = Order::create([
                'user_id' => $user->id,
                'total_amount' => $totalAmount + 15, // $15 shipping
                'status' => 'pending'
            ]);

            foreach ($cart->cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    'price' => $cartItem->product->price
                ]);

                $cartItem->product->decrement('stock', $cartItem->quantity);
            }

            Payment::create([
                'order_id' => $order->id,
                'payment_method' => $request->payment_method,
                'payment_status' => $request->payment_method === 'cod' ? 'pending' : 'pending'
            ]);

            $cart->cartItems()->delete();

            $order->load(['orderItems.product', 'payments']);
            return response()->json($order, 201);
        });
    }

    public function show(Order $order)
    {
        $user = Auth::user();
        if ($order->user_id !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $order->load(['orderItems.product', 'payments']);
        return response()->json($order);
    }
}
