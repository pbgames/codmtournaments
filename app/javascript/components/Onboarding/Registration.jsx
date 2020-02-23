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

class Registration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      instagram: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      isLoading: false,
    }

    this.handleValueChange = this.handleValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValueChange(key, value) {
    this.setState({ [key]: value });
  }

  handleSubmit() {
    const { username, email, instagram, password, passwordConfirmation, isLoading } = this.state;

    if (isLoading) {
      return false;
    };

    const params = {
      username,
      instagram,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    this.setState({ isLoading: true });
    Service.registration({ user: params }).then((response) => {
      if (response.data.errors) {
        this.setState({ errors: response.data.errors || {}, isLoading: false });
      } else {
        window.location.href = '/dashboard';
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { errors, isLoading } = this.state;

    return(
      <Box className={classes.container}>
        <TextField
          error={Boolean(errors.username)}
          required
          fullWidth
          onChange={(e) => this.handleValueChange('username', e.target.value)}
          label="Никнейм Call Of Duty Mobile"
          helperText={(
            errors.username ? errors.username[0] :
            "Вы можете зарегистрироваться только, если вы имеете аккаунт в Call of Duty Mobile используя никнейм из игры"
          )}
        />
        <TextField
          error={Boolean(errors.instagram)}
          required
          fullWidth
          label="Никнейм Instagram"
          onChange={(e) => this.handleValueChange('instagram', e.target.value)}
          helperText={(
            errors.instagram ? errors.instagram[0] :
            "Никнейм Instagram для контакта с вами"
          )}
        />
        <TextField
          error={Boolean(errors.email)}
          required
          fullWidth
          label="Email"
          onChange={(e) => this.handleValueChange('email', e.target.value)}
          helperText={(
            errors.email ? errors.email[0] :
            "Email для контакта с вами и восcтановления пароля"
          )}
        />
        <TextField
          error={Boolean(errors.password)}
          required
          fullWidth
          onChange={(e) => this.handleValueChange('password', e.target.value)}
          type="password"
          label="Пароль"
          helperText={(
            errors.password ? errors.password[0] :
            "Не менее 6 символов"
          )}
        />
        <TextField
          error={Boolean(errors.password_confirmation)}
          required
          fullWidth
          type="password"
          onChange={(e) => this.handleValueChange('passwordConfirmation', e.target.value)}
          label="Подтверждение пароля"
          helperText={(
            errors.password_confirmation ? errors.password_confirmation[0] :
            "Повторите пароль"
          )}
        />
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}
          className={classes.submit}
          endIcon={(isLoading && <CircularProgress size={25} className={classes.loader} />)}
        >
          Регистрация
        </Button>
      </Box>
    );
  }
}

export default withStyles(styles)(Registration);
