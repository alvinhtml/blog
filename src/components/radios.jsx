import React, { Component } from 'react'


export class Radio extends Component {

	render() {
        return (
            <label className={className}>
                <input
                    type="radio"
                    value={value}
                />
                {children}
            </label>
        )
	}
}


export class Radios extends Component {

	constructor(props) {

        super(props)

        this.state = {
            value: 0
        }

        //ES6 类中函数必须手动绑定
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange (e) {
        if (e.target.checked == true) {
            this.setState({
                value: e.target.value
            })
        }
	}

    componentWillReceiveProps(nextProps) {
		if (nextProps.value !== undefined) {
			this.setState({
		      value: nextProps.value
		    })
		}
	}

	render() {

		const {name, onChange} = this.props
        let radioChild = React.Children.map(this.props.children, (arg, i) => {
            let {value, className, children} = arg.props

            return(
                <label className={className}>
                    <input
                        type="radio"
                        name={name + '__radio_'}
                        value={value}
                        checked={this.state.value == value}
                        onChange={this.handleChange}
                    />
                    {children}
                </label>
            )
        })

        return <div>{radioChild}<input type="hidden" name={name} value={this.state.value} /></div>
	}
}
