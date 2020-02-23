import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

import Service from '../services/OnboardingService'

const styles = (theme) => ({
  submit: {
    marginTop: theme.spacing(2),
  },
  loader: {
    color: theme.palette.primary.contrastText,
  },
  container: {
    marginTop: theme.spacing(8),
  },
});

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: false,
      isLoading: false,
    }
    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValueChange(key, value) {
    this.setState({ [key]: value });
  }


  handleSubmit() {
    const { email, password } = this.state;
    const params = {
      email,
      password,
    };

    this.setState({ error: false, isLoading: true });

    Service.signIn(params).then((response) => {
      if (response.data) {
        window.location.href = '/dashboard'
      } else {
        this.setState({ error: true, isLoading: false, password: '' });
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { isLoading, error, password } = this.state;

    return(
      <Box className={classes.container}>
        <TextField
          required
          error={error}
          fullWidth
          onChange={(e) => this.handleValueChange('email', e.target.value)}
          label="Никнейм Call Of Duty Mobile или Email"
          helperText={(
            error ? "Неверный пароль или логин" :
            "Для входа в учетную запись используйте вказаный вами при регистрации никнейм Call Of Duty Mobile или Email"
          )}
        />
        <TextField
          required
          fullWidth
          onChange={(e) => this.handleValueChange('password', e.target.value)}
          type="password"
          label="Пароль"
          value={password}
        />
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={this.handleSubmit}
          endIcon={(isLoading && <CircularProgress size={25} className={classes.loader} />)}
        >
          Вход
        </Button>
      </Box>
    );
  }
}

export default withStyles(styles)(SignIn);
