import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Header from './Header';


// const styles = theme => ({
//   paper: {
//     position: 'absolute',
//     width: theme.spacing.unit * 50,
//     backgroundColor: theme.palette.background.paper,
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing.unit * 4,
//   },
// });

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      email: this.props.user.email,
      network: [],
      open: false,
    }

    // this.handleEdit = this.handleEdit.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    return (
      <div>
        <Header/>
        <Card>
          <CardContent>
          <div onClick={this.handleOpen}>
            <Button variant="contained" color="primary" fullWidth>Edit</Button>
          </div>
          <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
        </Modal>

            <Typography variant="h5">{this.state.firstName} {this.state.lastName}</Typography>
            <Typography variant="subheading">{this.state.email}</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Summary</Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5">Experience</Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: state.user
  };
};

// const SimpleModalWrapped = withStyles(styles)(Profile);

export default connect(mapStateToProps)(Profile);
