import { Component } from 'react';

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
export default class ScrollToBottom extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0,document.body.scrollHeight);
  }
  componentDidUpdate(prevProps) {
    window.scrollTo(0,document.body.scrollHeight);
  }

  render() {
    return null
  }
}
