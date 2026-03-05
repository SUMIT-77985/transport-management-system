import { style } from "framer-motion/client"
import "./about.css";
export default function About() {
  return (

    <div className="about-container">
      <h1 className="about-title">About This Project</h1>
      <section className="about-section">
        <h2>Project Objectives</h2>
        <ul id = "ul1">
          <li><a href = "#sec1 ">Automate transport management</a></li>
          <li><a href = "#sec2 ">Reduce operational costs</a></li>
          <li><a href = "#sec3">Improve delivery tracking</a></li>
        </ul>
      </section>

      <section className="about-section" >
      <h2 id = "sec1">Automate transport management</h2>
    
        <table id="tab2">
          <tr>
            <td>
              <img src="/image/taransport2.jpg" alt="image" id ="im12"/>
            </td>
            <td>
              <h3 id  = "atm">What is the benifit ? </h3><br/>
              <p>Automating transport management helps organizations<br/>
               streamline and control their transportation operations<br/>
               with greater accuracy and efficiency. By replacing manual processes<br/>
              with digital systems, tasks such as vehicle allocation,<br/>
              route planning, driver assignment, and tracking can be managed automatically.<br/>
              This reduces human errors, saves time, lowers operational costs, and improves overall coordination. <br/>
              Automation also enables real-time monitoring and data analysis,<br/>
              allowing managers to make informed decisions, improve delivery performance, and ensure timely and reliable transport services.</p>
            </td>
          </tr>
        </table>
      </section>
      <section className="about-section" >
      <h2 id = "sec2">Reduce operational costs</h2>
        <table id = "tab2">
          <tr>
            <td>
                <h3 id ="atm">How it reduces operational cost?</h3>
                <p>
                Automating transport management significantly reduces operational costs by
                eliminating inefficiencies in daily transportation activities.
                <br />

                Route optimization ensures vehicles take the shortest and most fuel-efficient
                paths, which helps reduce fuel consumption and travel time.
                <br />

                Automated scheduling minimizes idle time of vehicles and drivers, ensuring
                better utilization of available resources.
                <br />

                Real-time vehicle tracking helps prevent delays, unauthorized usage, and
                unnecessary detours, reducing maintenance and fuel expenses.
                <br />

                Digital record-keeping replaces manual paperwork, lowering administrative
                costs and reducing errors that can lead to financial losses.
                <br />

                Overall, automation enables smarter decision-making, leading to improved
                efficiency, lower expenses, and increased profitability.
              </p>
            </td>
            <td>
                <img src="/image/cost.jpg" alt="Cost" id = "im12"/>
            </td>
          </tr>
        </table>
        </section>
      <section className="about-section" >
      <h2 id ="sec3">Improve delivery tracking</h2>
      <table id= "tab2">
        <tr>
          <td>
            <img src="/image/tracking.jpg" alt="Tracking" id = "im12"/>
          </td>
          <td>
              <h3 id="atm">How it improve Delivery Tracking?</h3>
                <p>
                  Improving delivery tracking allows organizations to monitor the real-time
                  movement of vehicles and shipments throughout the delivery process.
                  <br />
                  With automated tracking systems, managers can view vehicle locations,
                  delivery status, and estimated arrival times instantly.
                  <br />
                  This visibility helps reduce delays, avoid route deviations, and quickly
                  respond to unexpected issues such as traffic or breakdowns.
                  <br />
                  Accurate delivery tracking also improves customer satisfaction by providing
                  timely updates and ensuring transparency in logistics operations.
                  <br />
                  Overall, enhanced delivery tracking leads to better coordination, improved
                  reliability, and more efficient transport management.
                </p>
          </td>
        </tr>
      </table>
      </section>
    </div>
  );
}
