/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi.plugins\packages\wizzi.plugin.js\examples\ittf\first.js.ittf
    utc time: Fri, 07 Apr 2023 16:31:21 GMT
*/
'use strict';
class Horse extends Animal {
    constructor(name) {
        super(name);
    }
    [hello] 'hey';
    static staticProps = {
            prop1: null, 
            prop2: {
                prop3: 10
             }
         }
    handleClickOpen(scroll) {
        () => 
        
            this.setState({
                open: true, 
                scroll: scroll
             })
    }
    say() {
        console.log("[32m%s[0m", 'Hiiii i am ' + this.name);
    }
    static create(name) {
        return new Horse(name);
    }
}
