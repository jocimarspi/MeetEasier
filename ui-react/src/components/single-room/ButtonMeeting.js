import React, { Component, Children } from 'react';
import ModalMeetForm from './ModalMeetForm';
import axios from 'axios';

class ButtonMeeting extends Component {
    state = {  
        visible: false, 
        buttonTitle: "Nova reunião",
    }    

    onActionMeeting = async e => {
        console.log("PASSOU! MARMARMAR");
        try {
          const { room } = this.props;
          const start = new Date();
          start.setHours(start.getHours() + 2);
          const end = new Date();
          end.setHours(end.getHours() + 3);
          const location = room.Name;
          const atendees = [room.Email, "jocimar.huss@db1.com.br"];
          const subject = "Reunião de Teste";
          const appointment = { subject, start, end, location, atendees };
          console.log(appointment);

          const rawResp = await axios.post("/api/rooms", appointment);
          const resp = rawResp.data;
          console.log(resp);
        } catch (err) {
          console.error(err);
        }
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

    render() {
        const { visible, buttonTitle } = this.state;
        const { room, details} = this.props;        
        
        return (
            <div>
                <button onClick={this.showModal}>{buttonTitle}</button>
                {/* <button onClick={this.onActionMeeting}>{buttonTitle}</button> */}
                <ModalMeetForm 
                    room={room}
                    roomdetails={details}
                    visible={visible}
                    title="Nova reunião"
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    />
            </div>
        );
    }
}

export default ButtonMeeting;