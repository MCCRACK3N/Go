import Nav from './Nav';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import ConferenceForm from './ConferenceForm';
import AttendeeForm from './AttendeeForm'
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import PresentationForm from './PresentationForm';
import MainPage from './Main';

function App(props) {
  if (props.attendees === undefined) {
    return null;
  }
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
        <Route path="/" index element={<MainPage />} />
        <Route path="attendees">
            <Route path="new" element={ <AttendeeForm />} />
          </Route>
          <Route path="locations">
            <Route path="new" element={<LocationForm />} />
          </Route>
          <Route path="conferences">
            <Route path="new" element={ <ConferenceForm />} />
          </Route>
          <Route path="attendees">
            <Route path="new" element={ <AttendeesList />} />
          </Route>
          <Route path="presentation">
            <Route path="new" element={ <PresentationForm />} />
          </Route>
        </Routes>

        {/* <AttendeeForm />
        <ConferenceForm />
        <LocationForm />
        <AttendeesList attendees={props.attendees} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;