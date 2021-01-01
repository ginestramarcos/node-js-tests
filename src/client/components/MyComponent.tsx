/* eslint-disable require-jsdoc */
import React from 'react';

import autobind from 'autobind-decorator';

interface Props {
  name: string;
}

interface State {
  firstValue?: number;
  secondValue?: number;
  result?: number | null;
}

export class MyComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  @autobind
  handleChangeFirstInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({firstValue: parseInt(event.target.value)});
  }

  @autobind
  handleChangeSecondInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({secondValue: parseInt(event.target.value)});
  }

  @autobind
  renderResultSection() : React.ReactNode {
    const {firstValue, secondValue, result} = this.state;
    const isNotDefined = (x: number | null | undefined) => !!(!x && x !== 0);
    if (isNotDefined(firstValue) ||
        isNotDefined(secondValue) ||
        isNotDefined(firstValue)) {
      return null;
    }
    return <span>{firstValue} + {secondValue} = {result}</span>;
  }

  @autobind
  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    this.setState({result: null});
    const params = new URLSearchParams({
      a: '' + (this.state.firstValue as number),
      b: '' + (this.state.secondValue as number),
    });
    fetch('addition?' + params)
        .then((res) => res.json())
        .then(
            (response) => {
              this.setState({result: response.result as number});
            },
            (error) => {
              console.error(error);
            });
  }

  render() : React.ReactNode {
    return (
      <div className="my-component">
        <form onSubmit={this.handleSubmit}>
          <label> a:
            <input type="text" onChange={this.handleChangeFirstInput} />
          </label>
          <label> b:
            <input type="text" onChange={this.handleChangeSecondInput} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.renderResultSection()}
      </div>
    );
  }
}
