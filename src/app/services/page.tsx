import "./services.css";

export default function Services() {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>

      {/* INTRO */}
      <section className="services-section">
        <p>
          Our Transport Management System provides a range of services designed
          to simplify transportation operations, improve efficiency, and reduce
          operational costs. Each service is built to support smooth and reliable
          transport management.
        </p>
      </section>

      {/* SERVICE 1 */}
      <section className="services-section">
        <h2>Vehicle Management</h2>
        <p>
          This service helps maintain complete records of vehicles, including
          availability, maintenance schedules, and usage history.
          <br /><br />
          It ensures that vehicles are properly utilized and maintained,
          reducing breakdowns and improving fleet performance.
        </p>
      </section>

      {/* SERVICE 2 */}
      <section className="services-section">
        <h2>Route Planning & Optimization</h2>
        <p>
          Route planning services help identify the most efficient paths for
          transportation.
          <br /><br />
          By optimizing routes, the system reduces fuel consumption, travel
          time, and delivery delays while improving overall productivity.
        </p>
      </section>

      {/* SERVICE 3 */}
      <section className="services-section">
        <h2>Driver Management</h2>
        <p>
          This service allows organizations to assign drivers, monitor
          performance, and manage schedules efficiently.
          <br /><br />
          It improves accountability, enhances safety, and ensures compliance
          with transport regulations.
        </p>
      </section>

      {/* SERVICE 4 */}
      <section className="services-section">
        <h2>Real-Time Tracking</h2>
        <p>
          Real-time tracking enables continuous monitoring of vehicle movement
          and delivery status.
          <br /><br />
          This helps reduce delays, improve transparency, and provide accurate
          delivery updates to stakeholders.
        </p>
      </section>

      {/* SERVICE 5 */}
      <section className="services-section">
        <h2>Reports & Analytics</h2>
        <p>
          The system generates detailed reports and analytics related to
          transport operations.
          <br /><br />
          These insights help managers make informed decisions, improve
          efficiency, and plan future transport strategies.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="services-footer">
        <p>
          Our services work together to deliver a complete and reliable transport
          management solution.
        </p>
      </footer>
    </div>
  );
}
