import "./home.css";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Transport Management System</h1>

      {/* HERO SECTION */}
      <div className="hero">
        <table id="tab1">
          <tbody>
            <tr>
              <td>
                <p id="para">
                  Our Transport Management System helps you efficiently
                  <br />
                  plan, track, and manage transportation operations in one centralized platform.
                  <br />
                  From vehicle and route management to real-time tracking and performance insights,
                  <br />
                  we simplify logistics to save time, reduce costs, and improve reliability.
                </p>
              </td>

              <td>
                <img
                  src="/image/transport1.jpg"
                  alt="Transport Management"
                  id="im"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* WHY SECTION */}
      <section className="content-section">
        <h2>Why Transport Management Matters</h2>
        <p>
          Efficient transport management is essential for reducing operational costs
          <br />and improving delivery performance. Manual processes often lead to delays,
          <br /> higher fuel costs, and poor coordination. Our system automates these tasks
          and ensures smooth transport operations.
        </p>
      </section>

      {/* FEATURES SECTION */}
      <section className="content-section">
        <h2>What Our System Offers</h2>
        <ul className="features-list">
          <li><strong>Centralized Control:</strong> Manage vehicles, drivers, and routes from one platform.</li>
          <li><strong>Real-Time Monitoring:</strong> Track vehicles and deliveries in real time.</li>
          <li><strong>Cost Optimization:</strong> Reduce fuel usage and operational expenses.</li>
          <li><strong>Safety & Compliance:</strong> Monitor driver performance and vehicle health.</li>
        </ul>
      </section>

      {/* TARGET USERS */}
      <section className="content-section">
        <h2>Who Can Use This Platform?</h2>
        <p>
          This system is ideal for logistics companies, delivery services,
          fleet managers, educational institutions, and businesses that rely
          on efficient transportation and fleet operations.
        </p>
      </section>

      {/* BENEFITS */}
      <section className="content-section">
        <h2>Benefits You’ll Experience</h2>
        <ul className="features-list">
          <li>Faster and more reliable deliveries</li>
          <li>Reduced manual work and errors</li>
          <li>Improved transparency and control</li>
          <li>Better decision-making through insights</li>
        </ul>
      </section>


    </div>
  );
}
