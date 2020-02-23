import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import themeOverride from './Theme';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Registration from './Onboarding/Registration';
import SignIn from './Onboarding/SignIn';

class OnboardingApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(e, value) {
    this.setState({ currentTab: value });
  }

  render() {
    const { currentTab } = this.state;

    return(
      <ThemeProvider theme={themeOverride}>
        <Container maxWidth='xs'>
          <AppBar>
            <Tabs
              variant="fullWidth"
              value={currentTab}
              onChange={this.handleTabChange}
            >
              <Tab label="Регистрация" />
              <Tab label="Вход" />
            </Tabs>
          </AppBar>
          { currentTab === 0 && (
            <Registration />
          )}
          { currentTab === 1 && (
            <SignIn />
          )}
        </Container>
      </ThemeProvider>
    );
  }
}

export default OnboardingApp;
