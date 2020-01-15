import React, { Component } from 'react';
import { Modal, Form, DatePicker, TimePicker, Input, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';

class ModalMeetForm extends Component {
    state = {  }
    
    saveAppointment = async (formValues) => {
        const { room, roomDetails } = this.props;
        const { date, startTime, endTime, email, subject } = formValues; 
        console.log(formValues);

        const start = new Date();        
        start.setTime(date.getTime());
        start.setHours(startTime.getHours());
        start.setMinutes(startTime.getMinutes());
        start.setSeconds(0);

        const end = new Date();
        end.setTime(date.getTime());
        end.setHours(endTime.getHours());
        end.setMinutes(endTime.getMinutes());
        end.setSeconds(0);

        const location = room.Name;
        const atendees = [room.Email, email];          
        const appointment = { subject, start, end, location, atendees };
        console.log(appointment);

        const rawResp = await axios.post("/api/rooms", appointment);
        const resp = rawResp.data;
        console.log(resp);
    }

    handleSubmit = e  => {
        e.preventDefault();
        
        const { form, onOk } = this.props;
    
        form.validateFields(async (err, fieldsValue) => {
            if (err) {
                return;
            }

        const values = {
            ...fieldsValue,
            date: new Date(Date.parse(fieldsValue["date"].format())),
            startTime: new Date(Date.parse(fieldsValue["start"].format())),
            endTime: new Date(Date.parse(fieldsValue["end"].format()))
        }

        console.log('Received values of form: ', fieldsValue);                     
        console.log('Received values : ', values);                     

        try {
            await this.saveAppointment(values);
            form.resetFields();
            onOk();
        } catch (err) {
            console.error(err);
        }
        });
      };

    render() {        
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
              xs: { span: 24},
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        
        const dateFormat = "DD/MM/YYYY";
        const timeFormat = "HH:mm";

        const dateConfig = {
            rules: [{ type: 'object', required: true, message: 'Por favor, informe uma data!' }],
            initialValue: moment(new Date(), dateFormat),
          };

          const timeConfig = {
            rules: [{ type: 'object', required: true, message: 'Por favor, informe um horário!' }],            
          };
        
        return (
            <Modal {...this.props} footer={false} >
                <Form 
                    {...formItemLayout} 
                    layout="vertical"
                    onSubmit={this.handleSubmit}>
                    <Form.Item label="Data">
                        {getFieldDecorator('date', dateConfig)(
                            <DatePicker format={dateFormat} />,
                        )}
                    </Form.Item> 
                    <Form.Item label="Horário">
                        {getFieldDecorator('start', timeConfig)(
                            <TimePicker format={timeFormat} />,
                        )} até: {getFieldDecorator('end', timeConfig)(
                            <TimePicker format={timeFormat}  />,
                        )}
                    </Form.Item>                         
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                            rules: [
                            {
                                type: 'email',
                                message: 'O e-mail é inválido!',
                            },
                            {
                                required: true,
                                message: 'Informe um e-mail valido',
                            },
                            ],
                        })(<Input placeholder="Informe o seu e-mail" />)}
                    </Form.Item>
                    <Form.Item label="Assunto">
                        {getFieldDecorator('subject', {
                            rules: [                           
                            {
                                required: true,
                                message: 'Informe o assunto da reunião',
                            },
                            ],
                        })(<Input placeholder = "Informe o assunto da reunião" />)}
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                        >
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Form.Item>                       
                </Form>
            </Modal>    
        );
    }
}

const WrappedModalMeetForm = Form.create({ name: 'meet_form' })(ModalMeetForm);
export default WrappedModalMeetForm;