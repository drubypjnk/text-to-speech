// import React, {Component} from 'react';
// import Items from "../../mockdata/Items";
// import Item from "./Item";
// import SweetAlert from 'sweetalert-react'
// import CreateForm from "./CreateForm";
// import EditForm from "./EditForm";
//
//
// class ListItem extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             items: Items,
//             showAlert: false,
//             titleAlert: '',
//             idAlert: '',
//         }
//     }
//
//     handleShowAlert = (item) => {
//         this.setState({
//             showAlert: true,
//             titleAlert: item.name,
//             idAlert: item.id
//         });
//     }
//     handleDelete = (id) => {
//         const newItems = this.state.items.filter(item => item.id !== id);
//         this.setState({
//             items: newItems,
//             showAlert: false,
//             titleAlert: '',
//             idAlert: ''
//         });
//     }
//
//     renderItem = () => {
//         let {items} = this.state;
//
//         return items.map((item, index) => {
//             return <Item
//                 key={index}
//                 item={item}
//                 index={index}
//                 onDelete={() => this.handleShowAlert(item)}
//             />
//         });
//     }
//
//     renderEditForm = () => {
//         return <EditForm/>;
//     }
//
//     render() {
//         return (
//             <div className="panel panel-success">
//                 <SweetAlert
//                     type={"info"}
//                     show={this.state.showAlert}
//                     title="Remove alert"
//                     text={"Do you want to remove post ID: " + this.state.idAlert}
//                     onConfirm={() => this.handleDelete(this.state.idAlert)}
//
//                 />
//
//                 <div className="panel-heading">List Item</div>
//                 <table className="table table-hover">
//                     <thead>
//                     <tr>
//                         <th style={{width: '10%'}} className="text-center">#</th>
//                         <th>Name</th>
//                         <th style={{width: '15%'}} className="text-center">Level</th>
//                         <th style={{width: '15%'}}>Action</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {this.renderItem()}
//                     </tbody>
//                 </table>
//
//
//
//             </div>
//
//         )
//     }
// }
//
// export default ListItem;
