import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const AdminPanel = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPatients, setShowPatients] = useState(false);
  const [patientTimeSlots, setPatientTimeSlots] = useState({});

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/get-doctors', {
          withCredentials: true,
        });
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch doctors');
        setLoading(false);
        toast.error('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin/get-patients', {
        withCredentials: true,
      });
      setPatients(response.data);
      setShowPatients(true);
    } catch (error) {
      setError(error.message || 'Failed to fetch patients');
      toast.error('Failed to fetch patients');
    }
  };

  const handleDateChange = (patientId, date) => {
    setPatientTimeSlots({
      ...patientTimeSlots,
      [patientId]: {
        ...patientTimeSlots[patientId],
        date: date ? date.toISOString().split('T')[0] : null,
      },
    });
  };

  const handleTimeChange = (patientId, time) => {
    setPatientTimeSlots({
      ...patientTimeSlots,
      [patientId]: {
        ...patientTimeSlots[patientId],
        time: time || '00:00',
      },
    });
  };

  const handleSetTimeSlot = async (patientId) => {
    const { date, time } = patientTimeSlots[patientId] || {};
    if (!date || !time) {
      toast.error('Please select both date and time');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/admin/set-time-slot',
        { patientId, date, time },
        { withCredentials: true }
      );
      toast.success('Time slot updated successfully');
    } catch (error) {
      toast.error('Failed to update time slot');
    }
  };

  const handleStatusChange = async (doctorId, currentStatus) => {
    const newStatus = currentStatus === 'Approved' ? 'Not Approved' : 'Approved';
    try {
      await axios.post(
        'http://localhost:8080/admin/change-doctor-status',
        { doctorId, status: newStatus },
        { withCredentials: true }
      );
      setDoctors(doctors.map(doctor =>
        doctor.id === doctorId ? { ...doctor, status: newStatus } : doctor
      ));
      toast.success(`Doctor status changed to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to change doctor status');
    }
  };

  if (loading && !showPatients) return <p style={{ textAlign: 'center', padding: '20px' }}>Loading...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red', padding: '20px' }}>Error: {error}</p>;

  return (
    <div style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <button
        onClick={() => setShowPatients(false)}
        style={{ margin: '0 10px', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        See All Doctors
      </button>
      <button
        onClick={fetchPatients}
        style={{ margin: '0 10px', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        See All Patients
      </button>

      {!showPatients && (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>Doctors List</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Name</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Email</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Specialization</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Phone</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Status</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.id}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.name}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.email}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.specialization}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.phone}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{doctor.status}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    <button
                      onClick={() => handleStatusChange(doctor.id, doctor.status)}
                      style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      {doctor.status === 'Approved' ? 'Unapprove' : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPatients && (
        <div>
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#000' }}>Patients List</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>ID</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Name</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Email</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Phone</th>
                <th style={{ borderBottom: '2px solid #ddd', padding: '10px' }}>Time Slot</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{patient.id}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{patient.name}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{patient.email}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>{patient.phone}</td>
                  <td style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <DatePicker
                        selected={patientTimeSlots[patient.id]?.date ? new Date(patientTimeSlots[patient.id]?.date) : null}
                        onChange={(date) => handleDateChange(patient.id, date)}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Select Date"
                        style={{ padding: '10px', fontSize: '16px' }}
                      />
                      <TimePicker
                        onChange={(time) => handleTimeChange(patient.id, time)}
                        value={patientTimeSlots[patient.id]?.time || '00:00'}
                        disableClock
                        format="HH:mm"
                        placeholder="Select Time"
                        style={{ padding: '10px', fontSize: '16px' }}
                      />
                      <button
                        onClick={() => handleSetTimeSlot(patient.id)}
                        style={{ padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Set Time Slot
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
