export default function TrackingTimeline({ events, currentStatus }) {
  const getStatusIndex = (status) => {
    const statusOrder = [
      'order_placed', 'payment_confirmed', 'processing', 'packed', 
      'shipped', 'in_transit', 'out_for_delivery', 'delivered'
    ];
    return statusOrder.indexOf(status);
  };

  const currentStatusIndex = getStatusIndex(currentStatus);

  return (
    <div style={s.timeline}>
      {events.map((event, index) => {
        const isActive = getStatusIndex(event.status) <= currentStatusIndex;
        const isCurrent = getStatusIndex(event.status) === currentStatusIndex;
        
        return (
          <div key={event.status} style={s.timelineItem}>
            {/* Timeline Line */}
            {index < events.length - 1 && (
              <div
                style={{
                  ...s.timelineLine,
                  backgroundColor: isActive ? '#2d9e5f' : '#e0e0e0',
                }}
              />
            )}
            
            {/* Timeline Dot */}
            <div
              style={{
                ...s.timelineDot,
                backgroundColor: isActive ? '#2d9e5f' : '#e0e0e0',
                border: isCurrent ? '3px solid #2d9e5f' : '2px solid #e0e0e0',
              }}
            >
              {isActive && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L4.5 8.5L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            
            {/* Timeline Content */}
            <div style={s.timelineContent}>
              <div style={s.timelineHeader}>
                <h3 style={{
                  ...s.timelineTitle,
                  color: isActive ? '#111' : '#999',
                  fontWeight: isCurrent ? '700' : isActive ? '600' : '400',
                }}>
                  {event.title}
                </h3>
                {event.timestamp && (
                  <span style={{
                    ...s.timelineTime,
                    color: isActive ? '#666' : '#999',
                  }}>
                    {new Date(event.timestamp).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>
              <p style={{
                ...s.timelineDescription,
                color: isActive ? '#666' : '#aaa',
              }}>
                {event.description}
              </p>
              <p style={{
                ...s.timelineLocation,
                color: isActive ? '#888' : '#bbb',
              }}>
                {event.location}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const s = {
  timeline: {
    position: 'relative',
    paddingLeft: '32px',
  },
  timelineItem: {
    position: 'relative',
    paddingBottom: '32px',
  },
  timelineLine: {
    position: 'absolute',
    left: '8px',
    top: '24px',
    width: '2px',
    height: 'calc(100% - 8px)',
    backgroundColor: '#e0e0e0',
  },
  timelineDot: {
    position: 'absolute',
    left: '0',
    top: '4px',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#e0e0e0',
    border: '2px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  timelineContent: {
    marginLeft: '8px',
  },
  timelineHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '4px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  timelineTitle: {
    fontSize: '16px',
    margin: '0',
    color: '#111',
  },
  timelineTime: {
    fontSize: '12px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
  },
  timelineDescription: {
    fontSize: '14px',
    margin: '0 0 4px',
    lineHeight: 1.4,
  },
  timelineLocation: {
    fontSize: '12px',
    margin: 0,
    fontStyle: 'italic',
  },
};
