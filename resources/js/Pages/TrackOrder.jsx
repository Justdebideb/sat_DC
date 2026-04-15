import { useState, useEffect } from 'react';
import TrackingTimeline from '../components/TrackingTimeline.jsx';
import { generateTrackingData } from '../data/shippingData.js';

export default function TrackOrder({ orderData, onBack }) {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(orderData?.orderNumber || '');

  useEffect(() => {
    // Simulate loading tracking data
    const loadTrackingData = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (orderData) {
        const data = generateTrackingData(orderData.orderNumber, orderData.shipping);
        setTrackingData(data);
      }
      
      setLoading(false);
    };

    if (orderData) {
      loadTrackingData();
    }
  }, [orderData]);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock tracking data for search
    const mockOrderData = {
      orderNumber: searchQuery,
      shipping: {
        city: 'Manila',
        address: '123 Makati Avenue'
      }
    };
    
    const data = generateTrackingData(searchQuery, mockOrderData.shipping);
    setTrackingData(data);
    setLoading(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      order_placed: { label: 'Order Placed', color: '#666' },
      payment_confirmed: { label: 'Payment Confirmed', color: '#4CAF50' },
      processing: { label: 'Processing', color: '#2196F3' },
      packed: { label: 'Packed', color: '#FF9800' },
      shipped: { label: 'Shipped', color: '#9C27B0' },
      in_transit: { label: 'In Transit', color: '#00BCD4' },
      out_for_delivery: { label: 'Out for Delivery', color: '#FF5722' },
      delivered: { label: 'Delivered', color: '#4CAF50' },
    };

    const config = statusConfig[status] || statusConfig.order_placed;
    return config;
  };

  if (loading) {
    return (
      <div style={s.page}>
        <nav style={s.nav}>
          <span style={s.logo}>AURA.</span>
          <button style={s.backBtn} onClick={onBack}>Back</button>
        </nav>
        <div style={s.loadingContainer}>
          <div style={s.spinner}></div>
          <p style={s.loadingText}>Loading tracking information...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Navbar */}
      <nav style={s.nav}>
        <span style={s.logo}>AURA.</span>
        <button style={s.backBtn} onClick={onBack}>Back</button>
      </nav>

      <div style={s.container}>
        {/* Search Section */}
        <div style={s.searchSection}>
          <h1 style={s.title}>Track Your Order</h1>
          <div style={s.searchBar}>
            <input
              style={s.searchInput}
              type="text"
              placeholder="Enter order number (e.g., ORD-1234567890)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button style={s.searchBtn} onClick={handleSearch}>
              Track
            </button>
          </div>
        </div>

        {trackingData && (
          <>
            {/* Order Info Card */}
            <div style={s.orderCard}>
              <div style={s.orderHeader}>
                <div>
                  <h2 style={s.orderNumber}>{trackingData.orderNumber}</h2>
                  <p style={s.orderDate}>
                    Placed on {new Date(trackingData.events[0].timestamp).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div style={{
                  ...s.statusBadge,
                  backgroundColor: getStatusBadge(trackingData.currentStatus).color,
                }}>
                  {getStatusBadge(trackingData.currentStatus).label}
                </div>
              </div>

              <div style={s.orderDetails}>
                <div style={s.detailItem}>
                  <span style={s.detailLabel}>Tracking Number:</span>
                  <span style={s.detailValue}>{trackingData.trackingNumber}</span>
                </div>
                <div style={s.detailItem}>
                  <span style={s.detailLabel}>Courier:</span>
                  <div style={s.courierInfo}>
                    <span style={{
                      ...s.courierLogo,
                      backgroundColor: trackingData.courier.color,
                    }}>
                      {trackingData.courier.logo}
                    </span>
                    <span style={s.courierName}>{trackingData.courier.name}</span>
                  </div>
                </div>
                <div style={s.detailItem}>
                  <span style={s.detailLabel}>Estimated Delivery:</span>
                  <span style={s.detailValue}>
                    {trackingData.estimatedDelivery.toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div style={s.detailItem}>
                  <span style={s.detailLabel}>Shipping Zone:</span>
                  <span style={s.detailValue}>
                    {trackingData.shippingZone.name} ({trackingData.shippingZone.deliveryTime})
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div style={s.timelineCard}>
              <h2 style={s.sectionTitle}>Tracking Timeline</h2>
              <TrackingTimeline 
                events={trackingData.events} 
                currentStatus={trackingData.currentStatus}
              />
            </div>

            {/* Delivery Address */}
            <div style={s.addressCard}>
              <h2 style={s.sectionTitle}>Delivery Address</h2>
              <div style={s.addressContent}>
                <p style={s.addressName}>
                  {trackingData.shippingAddress.firstName} {trackingData.shippingAddress.lastName}
                </p>
                <p style={s.addressLine}>{trackingData.shippingAddress.address}</p>
                <p style={s.addressLine}>
                  {trackingData.shippingAddress.city}, {trackingData.shippingAddress.zip}
                </p>
                <p style={s.addressLine}>{trackingData.shippingAddress.phone}</p>
              </div>
            </div>

            {/* Contact Support */}
            <div style={s.supportCard}>
              <h2 style={s.sectionTitle}>Need Help?</h2>
              <div style={s.supportContent}>
                <p style={s.supportText}>
                  If you have any questions about your order, please contact our customer support.
                </p>
                <div style={s.contactInfo}>
                  <div style={s.contactItem}>
                    <span style={s.contactLabel}>Email:</span>
                    <span style={s.contactValue}>support@aura.com.ph</span>
                  </div>
                  <div style={s.contactItem}>
                    <span style={s.contactLabel}>Phone:</span>
                    <span style={s.contactValue}>+63 2 8123 4567</span>
                  </div>
                  <div style={s.contactItem}>
                    <span style={s.contactLabel}>Hotline:</span>
                    <span style={s.contactValue}>1800-1234 (Toll-free)</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#f8f9fa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  nav: {
    background: 'white',
    borderBottom: '1px solid #e8e8e8',
    padding: '0 40px',
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    fontSize: '20px',
    fontWeight: '900',
    letterSpacing: '-0.5px',
    color: '#111',
  },
  backBtn: {
    background: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 52px)',
    gap: '16px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #111',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '16px',
    color: '#666',
  },
  container: {
    maxWidth: '800px',
    margin: '32px auto',
    padding: '0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  searchSection: {
    background: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#111',
    margin: '0 0 24px',
    letterSpacing: '-0.5px',
  },
  searchBar: {
    display: 'flex',
    gap: '12px',
  },
  searchInput: {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  searchBtn: {
    padding: '12px 24px',
    background: '#111',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  orderCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '16px',
  },
  orderNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111',
    margin: '0 0 4px',
  },
  orderDate: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    color: 'white',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  orderDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '16px',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  detailLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  detailValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111',
  },
  courierInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  courierLogo: {
    width: '24px',
    height: '24px',
    borderRadius: '4px',
    color: 'white',
    fontSize: '10px',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  courierName: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111',
  },
  timelineCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#111',
    margin: '0 0 24px',
  },
  addressCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  addressContent: {
    background: '#f8f9fa',
    borderRadius: '8px',
    padding: '16px',
  },
  addressName: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111',
    margin: '0 0 8px',
  },
  addressLine: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 4px',
  },
  supportCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  supportText: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  contactInfo: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  contactLabel: {
    fontSize: '12px',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  contactValue: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#111',
  },
};
