// import React, { Component } from 'react';
// import 'antd/dist/antd.css';
// import { Modal, Button } from 'antd';

// class MeetForm extends Component {
//   state = { visible: false };

//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     return (
//       <div>
//         <Button type="primary" onClick={this.showModal}>
//           Open Modal
//         </Button>
//         <Modal
//           title="Basic Modal"
//           visible={this.state.visible}
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//         >
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//           <p>Some contents...</p>
//         </Modal>
//       </div>
//     );
//   }
// }

// export default MeetForm;