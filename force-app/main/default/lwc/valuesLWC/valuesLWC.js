import { LightningElement, api} from 'lwc';

export default class ValeusLWC extends LightningElement {
    @api iter;
    xIter;
    
    connectedCallback(){
        this.xIter = JSON.parse(JSON.stringify(this.iter));
        this.link ="/" + (this.xIter.keyId);
    }
    get cellLink() {
        return this.xIter.format == "Link";
    }
    get cellDate() {
        return this.xIter.format == "Date";
    }
    get cellNoFormat() {
        return this.xIter.format == "none";
    }
    get cellNumber() {
        return this.xIter.format == "Number";
    }
    get cellText() {
        return this.xIter.format == "Text";
    }
    get cellCheckboxTrue() {
        if (this.xIter.format == "Checkbox"){
            if (this.xIter.value == true){
            return true;
            }
        }
    }
    get cellCheckboxFalse() {
        if (this.xIter.format == "Checkbox"){
            if (this.xIter.value == false){
            return true;
            }
        }
    }
    // get checkboxImage() {
    //     if (this.xIter.format == "CheckboxImg"){
    //         if (this.xIter.value == true){
    //             this.xIter.value = "standard:first_non_empty";
    //         }
    //         else {this.xIter.value = "standard:task2"}
    //         return true;
    //     }
    // }
}