import { createElement, Component } from 'preact';

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.zimletContext = props.children.context;

        //Get all zimlets
        const zimlets = this.zimletContext.getAccount().zimlets
        this.globalConfig = new Map();
        //Get demo zimlet
        let zimlet = zimlets.zimlet.find(zimlet => zimlet.zimlet[0].name === "zm-zimlet-configuration");
        
        /*Zimbra Zimlet Sideloader does not support reading Zimlet configuration xml's, 
         * so to read a configuration you must either package and deploy the Zimlet using zmzimletctl 
         * or use this work around so you can develop with Sideloader. This will help if you have not 
         * made a final decision on what properties you want in your config_template.xml and what to 
         * develop them on-the-fly.
         * 
         * IT IS ***STRONGLY*** ADVISED TO NOT USE THIS WORKAROUND IN PRODUCTION:
         * */
        if (!zimlet) {
           zimlets.zimlet.push(
              {
                 "__typename": "AccountZimletInfo",
                 "zimletContext": null,
                 "zimlet": [
                    {
                       "__typename": "AccountZimletDesc",
                       "name": "zm-zimlet-configuration",
                       "label": null,
                       "zimbraXZimletCompatibleSemVer": null,
                       "description": null
                    }
                 ],
                 "zimletConfig": [
                    {
                       "__typename": "AccountZimletConfigInfo",
                       "global": [
                          {
                             "__typename": "ZimletConfigGlobal",
                             "property": [
                                {
                                   "__typename": "ZimletConfigProperty",
                                   "name": "property1",
                                   "content": "property1 read from work-around"
                                 },                                 {
                                   "__typename": "ZimletConfigProperty",
                                   "name": "property2",
                                   "content": "property2 read from work-around"
                                }
                             ]
                          }
                       ],
                       "host": null,
                       "property": null,
                       "name": "zm-zimlet-configuration",
                       "version": null
                    }
                 ]
              });
           zimlet = zimlets.zimlet.find(zimlet => zimlet.zimlet[0].name === "zm-zimlet-configuration");
        }
        /*end sideloader work-around*/

        //Add all demo zimlet configuration properties to an ES6 Map from the Zimbra server
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
