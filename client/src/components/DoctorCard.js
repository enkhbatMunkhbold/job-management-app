import { Link } from "react-router-dom";
import "../styling/DoctorCard.css";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="doctor-card">
      <div className="doctor-card-content">
        <div className="doctor-header">
          <h3>{doctor.first_name} {doctor.last_name}</h3>
          <span className="specialty">{doctor.specialty}</span>
        </div>
        <div className="doctor-info">
          <div className="info-item">
            <span className="label">Specialty:</span>
            <span className="value">{doctor.specialty}</span>
          </div>
          <div className="info-item">
            <span className="label">Available Times:</span>
            <div className="time-slots">
              {doctor.appointments?.map((appointment, index) => (
                <span key={index} className="time-slot">{appointment.time}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="doctor-actions">
          <Link to={`/appointments/new?doctor_id=${doctor.id}`} className="book-appointment">
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;