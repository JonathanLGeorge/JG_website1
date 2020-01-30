# JG_website1
re done personal website with links to projects and linkedIn/GitHub

01/28/20
  -Learned React Hooks, after front end for flight Project is done I need to start transforming this website into a react site 
  and clean up the code.
  ============================================================================================================================
Notes for react 01/28/20

Statless Functional components 
    
    //JaveScript Functions example 
        function Welcom(props){
            return <h1>Hello, {props.name}</h1>;
        }

Statful Class components
    //Class extending Components class
    //Render method returning HTML
        class Welcome extends React.Component{
            render(){
                return <h1>Hello, {this.props.name}</h1>
            }
        }

        App.js is a class componet

arrow Functions

function Greet(){
    return <h1>Hello<h1/>
}
//same
const Greet = () => {
    <h1>Hello<h1/>
}


functional component
//Greet.js
    import Recat from 'react'

    const Greet(){
            return <h1>Class Component</h1>
    }
    export default Greet

class component
//Welcome.js
    import Recat, {Component} from 'react'

    class Welcome extends Component{
        render(){
            return <h1>Class Component</h1>
        }
    }
    export default Welcome

which to use?class or function?

    functionl:
        -simple Functions
        -absence of 'this' keyword
        solution without using State
        -mainly responsible for UI
        -Statless/ dumb/ presentational(unless using hooks)
        -use these as much as possible?

    class:
        -feature rich
        -maintain their own private data (hold state)
        -Complex UI logic
        -Provide lifecycle hooks
        -Statful /smart/ container

JSX
    -JSXtags
        -(has)tag name, attribute,and children
    Class-> className //depends on version though might be class in future
    for -> htmlFor

    camelCase propertynameing convention 
        -onclick -> onclick
        -tabindext ->tabindext


14-26
28
38-43    
========================================================================================
Props vs State

props:
    props get passedto the component
    function parameters
    props are immutable
    props- functional components
    this.props - class componet

state:
    stateis managed within the componet
    variable declared in the function body
    state can be changed
    useState Hook-functional Components
    this.state -class components
======================================================================================
setState:
    -always make use of setState and never modify the state directly
    
    -code has tobe excuted after the state has been updated ? place that code in the call back
    function which is the second argument to the setState method
    
    -when you have to update state based on the previous state value, pass in a function as an
    argument instead of the regual object
====================================================================================
Destructuring:
    in classes:
        inside render method:
            -const {state1, state2, ...} = this.state
            -const {name, lastname} = this.props

    in functional components:
        before return statment
            -const {name, lastname} = this.props
============================================================================
react life cycle methods 16.4+

Mounting: 
    called:
        -When an instance of a component is being created and inserted into the dom
    methods:
        -constructor
        -static getDerivedStateFromProps
        -shouldComponentUpdate,
        -render 
Updating:
    called:
        -When a component is being re-rendered as a result of changes to either its props
    methods:
        -static getDerivedStateFromProps
        -shouldComponentUpdate
        -render
        -getSnapshotBeforeUpdate
        -componentDidUpdate
unmounting:
    called:
        -When a component is being removed from the dom
    methods:
        -componentWillUnmount

Error Handling: 
    called:
        -when there is an error during rendering, in the lifecycle method, 
        or in the constructor of and child component
    methods:
        -static getDerivedStateFromError
        -componentDidCatch
==============================================================================

Mounting Lifecycle methods

constructor(props) is a special function that will get called whenever a new componet is created
    what is constuctor used for?
        -initializing state or Binding the event handlers
    We should not not casuse side effects 
        -example: never make an http request within the constructor
    we need to call super(props) 
        -which will call the baseline constructor
        - it will directly overwrite this.state
        -this.props only works if you pass in props as the argument 

static getDerivedStateFromProps(props, state)
    -when the state of the component depends on changes in props over time
    -set the state
    -you should no not case side effects

render(): only required method
    -read props and state and return JSX
    -should not change state or iteract with DOM or make AJAX calls
    -children components lifecycle methods are also excucted 

 componentDidMount()
    -invoked immediatly after component and all its childen components have been rendeered to the DOM
    -perfect for cause side effects: EX interact with DOM or perform and AJAX callsto load data
==================================================================================
React.Fragment
