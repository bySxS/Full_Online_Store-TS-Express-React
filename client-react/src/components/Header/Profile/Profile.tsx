import React from 'react'
import { Dropdown } from 'react-bootstrap'
import st from 'components/Header/Header.module.scss'

const Profile = () => {
  return (
    <div>
      <Dropdown className={'pr-2'}>
        <Dropdown.Toggle className={`border-0 ${st.btn}`}>
          <i className="bi bi-person-circle text-3xl text-gray-700 pr-1.5"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu className={st.drop_menu}>

          <Dropdown.Item className="dropdown-header">
            <h6>Гость</h6>
            <span>Група</span>
          </Dropdown.Item>

          <Dropdown.Item className="dropdown-item d-flex align-items-center">
            <i className="bi bi-person pr-1.5"></i>
            <span>My Profile</span>
          </Dropdown.Item>

          <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-gear pr-1.5"></i>
            <span>Account Settings</span>
          </Dropdown.Item>

          <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-question-circle pr-1.5"></i>
            <span>Need Help?</span>
          </Dropdown.Item>

          <Dropdown.Divider />

          <Dropdown.Item className="dropdown-item d-flex align-items-center" href="#">
            <i className="bi bi-box-arrow-right pr-1.5"></i>
            <span>Sign Out</span>
          </Dropdown.Item>

        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default Profile
