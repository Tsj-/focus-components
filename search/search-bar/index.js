// Dependencies

let builder = require('focus').component.builder;
let type = require('focus').component.types;
let React = require('react');
let words = require('lodash/string/words');
let actionWrapper = require('../../page/search/search-header/action-wrapper');

// Components

let Scope = require('./scope').component;

// Mixins

let stylable = require('../../mixin/stylable');
let i18n = require('../../common/i18n/mixin');
let storeBehaviour = require('../../common/mixin/store-behaviour');

/**
 * SearchBar component
 * @type {Object}
 */
let SearchBar = {
    mixins: [i18n, stylable, storeBehaviour],
    stores: [{
        store: Focus.search.builtInStore.queryStore,
        properties: ['query', 'scope']
    }],
    displayName: 'SearchBar',
    getDefaultProps() {
        return {
            placeholder: 'Enter your search here...',
            scopes: [],
            minChar: 0,
            loading: false,
            helpTranslationPath: 'search.bar.help',
            hasScopes: true
        };
    },
    propTypes: {
        placeholder: type('string'),
        value: type('string'),
        scopes: type('array'),
        minChar: type('number'),
        loading: type('bool'),
        helpTranslationPath: type('string'),
        hasScopes: type('bool')
    },
    getInitialState() {
        return {
            query: Focus.search.builtInStore.queryStore.getQuery() || '',
            scope: Focus.search.builtInStore.queryStore.getScope() || '',
            loading: this.props.loading
        };
    },
    componentDidMount() {
        React.findDOMNode(this.refs.query).focus();
    },
    //getValue() {
    //    if (this.props.hasScopes) {
    //        return {
    //            scope: this.refs.scope.getValue(),
    //            query: React.findDOMNode(this.refs.query).value
    //        }
    //    } else {
    //        return {
    //            query: React.findDOMNode(this.refs.query).value
    //        }
    //    }
    //},
    _getClassName() {
        return `form-control`;
    },
    _handleQueryChange() {
        actionWrapper(() => {
            Focus.dispatcher.handleViewAction({
                data: {
                    query: React.findDOMNode(this.refs.query).value
                },
                type: 'update'
            });
        })();

    },
    _handleKeyUp(event) {
        this.setState({query: event.target.value}, ()=> {
            if (this.state.query.length >= this.props.minChar) {
                if (this.props.handleKeyUp) {
                    this.props.handleKeyUp(event);
                }
                this._handleQueryChange();
            }
        });

    },
    _handleOnClickScope() {
        this._focusQuery();
        Focus.dispatcher.handleViewAction({
            data: {
                scope: this.refs.scope.getValue()
            },
            type: 'update'
        });
    },
    _renderHelp() {
        return (
            <div className='sb-help' ref='help'>{this.i18n(this.props.helpTranslationPath)}</div>
        );
    },
    _focusQuery() {
        React.findDOMNode(this.refs.query).focus();
    },
    //setStateFromSubComponent() {
    //    return this.setState(this.getValue(), this._focusQuery);
    //},
    render() {
        let loadingClassName = this.props.loading ? 'sb-loading' : '';
        return (
            <div className={`${this._getStyleClassName()}`} data-focus='search-bar'>
                {this.props.hasScopes &&
                <div className='sb-scope-choice'>
                    <Scope handleOnClick={this._handleOnClickScope} list={this.props.scopes} ref='scope'
                           value={this.state.scope}/>
                </div>
                }
                <div className='sb-input-search'>
                    <input autofocus className={this._getClassName()} onChange={this._handleKeyUp} ref='query'
                           type='search' placeholder={this.props.placeholder} value={this.state.query}/>

                    <div className={`sb-spinner three-quarters-loader ${loadingClassName}`}></div>
                </div>
                {this._renderHelp()}
            </div>
        );
    }
};

module.exports = builder(SearchBar);
