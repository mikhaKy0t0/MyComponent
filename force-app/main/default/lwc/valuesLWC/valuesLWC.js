import { LightningElement, api, track } from 'lwc';

export default class ValeusLWC extends LightningElement {
    // Attributes From tableLWC component
    @api iter;
    @track xIter;

    connectedCallback(){
        this.xIter = JSON.parse(JSON.stringify(this.iter));
        this.link ="/" + (this.xIter.keyId);
    }
    get cellLink() {
        if (this.xIter.format == "Link"){
            return true;
        }
    }
    get cellDate() {
        if (this.xIter.format == "Date"){
            return true;
        }
    }
    get cellNoFormat() {
        if (this.xIter.format == "none"){
            return true;
        }
    }
    get cellCheckbox() {
        if (this.xIter.format == "Checkbox"){
            if (this.xIter.value == true){
                this.xIter.value = "standard:first_non_empty";
            }
            else {this.xIter.value = "standard:task2"}
            return true;
        }
    }
    get cellNumber() {
        if (this.xIter.format == "Number"){
            return true;
        }
    }
}