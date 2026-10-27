export type EventItem = {
  title: string;
  description: string;
  date: string;
  venue: string;
  price: string;
  available: boolean;
};

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="event-card">
      <div className="event-card-banner" />
      <div className="event-card-body">
        <h3 className="heading-sm">{event.title}</h3>
        <p className="event-card-description">{event.description}</p>
        <div className="event-card-meta">
          <p className="event-card-date">{event.date}</p>
          <p className="event-card-venue">{event.venue}</p>
        </div>
        <div className="event-card-footer">
          <p className="event-card-price">{event.price}</p>
          {event.available && <span className="event-card-status">AVAILABLE</span>}
        </div>
      </div>
    </article>
  );
}
