import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup
} from '@mui/material';
import { BarraNavegacion } from '../components/BarraNavegacion';
import { getUnloadedSessions, loadSession } from '../services/train';
import { createPublication } from '../services/publication';

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  about: Yup.string().required("Required"),
  duracion: Yup.number().required("Required"),
  fecha: Yup.date().required("Required"),
  is_public: Yup.string().required("Required")  // Validación para el campo is_public
});

const navStyles = {
  position: 'fixed',
  top: 0,
  width: '100%',
  zIndex: 1000
};

const appStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  flexDirection: 'column',
  paddingTop: '60px'
};

const formContainerStyles = {
  width: '70%'
};

const TrainingSesion = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);

  useEffect(() => {
    getUnloadedSessions()
      .then(data => {
        console.log('Fetched sessions in component:', data);
        setSessions(data);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
        setSessions([]);
      });
  }, []);

  const handleSelectSession = (e, setFieldValue) => {
    const session = sessions.find(s => s.id === e.target.value);
    console.log('Selected session:', session);
    setSelectedSession(session);
    if (session) {
      setFieldValue("duracion", session.duration);
      setFieldValue("fecha", session.date);
    }
  };

  return (
    <div style={appStyles}>
      <div style={navStyles}>
        <BarraNavegacion />
      </div>
      <div style={formContainerStyles}>
        <Formik
          initialValues={{
            name: "",
            about: "",
            duracion: "",
            fecha: "",
            is_public: "public"  // Valor inicial para el campo is_public
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (selectedSession) {
              console.log('Submitting updated session:', values);
              loadSession(selectedSession.id, {
                name: values.name,
                notes: values.about,
                duration: selectedSession.duration, // Keep original duration
                date: selectedSession.date
              })
                .then(response => {
                  console.log('Session updated successfully:', response);
                  // Convertir el valor is_public a booleano
                  const isPublic = values.is_public === "public";
                  return createPublication(selectedSession.id, isPublic);
                })
                .then(pubResponse => {
                  console.log('Publication created successfully:', pubResponse);
                  alert('Session and publication created successfully');
                  setSubmitting(false);
                  resetForm();
                  getUnloadedSessions().then(data => setSessions(data));
                })
                .catch(error => {
                  console.error('Error updating session or creating publication:', error);
                  setSubmitting(false);
                });
            }
          }}
        >
          {({ setFieldValue, isSubmitting, dirty, handleReset, handleChange, values }) => (
            <Form>
              <FormControl fullWidth margin="normal">
                <InputLabel id="session-label">Choose your session</InputLabel>
                <Select
                  labelId="session-label"
                  id="session"
                  name="session"
                  value={selectedSession ? selectedSession.id : ""}
                  onChange={(e) => handleSelectSession(e, setFieldValue)}
                >
                  {Array.isArray(sessions) && sessions.length > 0 ? sessions.map(session => (
                    <MenuItem key={session.id} value={session.id}>{session.name}</MenuItem>
                  )) : (
                    <MenuItem value="" disabled>No sessions available</MenuItem>
                  )}
                </Select>
              </FormControl>
              <br />
              <br />
              <Field
                as={TextField}
                name="name"
                type="text"
                label="Name"
                fullWidth
                margin="normal"
              />
              <ErrorMessage name="name" component="div" className="input-feedback" />

              <Field
                as={TextField}
                name="about"
                label="Tell us about session"
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <ErrorMessage name="about" component="div" className="input-feedback" />

              <Field
                as={TextField}
                name="duracion"
                type="number"
                label="Duration"
                fullWidth
                margin="normal"
                disabled
              />
              <ErrorMessage name="duracion" component="div" className="input-feedback" />

              <Field
                as={TextField}
                name="fecha"
                type="date"
                label="Date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                disabled
              />
              <ErrorMessage name="fecha" component="div" className="input-feedback" />
              <br />
              <br />

              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="is_public"
                  name="is_public"
                  onChange={handleChange}
                  value={values.is_public}
                >
                  <FormControlLabel value="public" control={<Radio />} label="Public" />
                  <FormControlLabel value="private" control={<Radio />} label="Private" />
                </RadioGroup>
              </FormControl>

              <br />

              <Button
                variant="contained"
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isSubmitting}
                sx={{
                  backgroundColor: '#FF6633',
                  '&:hover': {
                    backgroundColor: '#CC5527', // Un color más oscuro para el hover
                  },
                }}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TrainingSesion;
