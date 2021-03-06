// see http://www.getmdl.io/components/index.html#layout-section/grid
//dependencies
const React = require('react');
const {Component} = React;
import types from 'focus-core/component/types';
/**
 * Grid component.
 */
class Grid extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount () {
        console.warn('FocusComponents v0.15: the \'Grid\' component from FocusComponents.common is deprecated, please use FocusComponents.components.Grid');
    }
    /** @inheriteDoc */
    render() {
        const {children, ...otherProps} = this.props;
        return (
            <div className='mdl-grid' {...otherProps}>
                {children}
            </div>
        );
    }
}

Grid.propTypes = {};

//Static props.
Grid.displayName = 'Grid';
module.exports = Grid;
