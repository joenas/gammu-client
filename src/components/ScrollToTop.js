import { Component } from 'react';

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
export default class ScrollToTopOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0)
  }
  componentDidUpdate(prevProps) {
    window.scrollTo(0, 0)
  }

  render() {
    return null
  }
}
