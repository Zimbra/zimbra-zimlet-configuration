import { createElement, Component } from 'preact';

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.zimletContext = props.children.context;

        //Get all zimlets
        const zimlets = this.zimletContext.getAccount().zimlets
        this.globalConfig = new Map();
        //Get demo zimlet
        const zimlet = zimlets.zimlet.find(zimlet => zimlet.zimlet[0].name === "zm-zimlet-configuration");

        //Add all demo zimlet configuration properties to an ES6 Map
        if (zimlet) {
            const globalConfig = zimlet.zimletConfig[0].global[0].property || [];
            for (var i = 0; i < globalConfig.length; i++) {
                this.globalConfig.set(globalConfig[i].name, globalConfig[i].content);
            };
        }
        //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
        //now you can get a property value by doing: this.globalConfig.get('name-of-property')
    };

    //Show properties of this Zimlet in the browser developer console, and alert to the user.
    handleClick = e => {
        console.log(this.globalConfig);

        //Use forEach on ES6 Map to show it on screen for demo purpose.
        let globalConfigLogString = "";
        this.globalConfig.forEach(function (value, key, map) {
            globalConfigLogString += key + ":" + value + "\n";
        });

        alert(globalConfigLogString);
    }


    render() {
        return (
            <div onClick={this.handleClick} class="zimbra-client_menu-item_navItem zimbra-client_action-menu-item_item">
                <span class="zimbra-client_action-menu-item_icon">
                    <span role="img" class="zimbra-icon zimbra-icon-about blocks_icon_md"></span></span>
                <span class="zimbra-client_menu-item_inner">Global Config Test</span></div>
        );
    }
}
