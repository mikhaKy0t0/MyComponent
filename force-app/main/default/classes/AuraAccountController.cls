//придумать название для всего проекта
public with sharing class AuraAccountController{
    @AuraEnabled
    // lowerCamelCase для функций и перменных 
    // UpperCamelCase для названий классов
    public static List<sObject> RelatedListComp(Id recordId, String choose_object, String FieldsToDisplay, String OrderField, String Direction){
        List<sObject> ReList = new List<sObject>();
        String SOQLquery = null;
        if (OrderField != null) {
            SOQLquery='Select '+ FieldsToDisplay + ' FROM ' + choose_object + ' WHERE AccountId =: recordId ORDER BY ' + OrderField + ' ' + Direction;
        }
        else {
            SOQLquery='Select '+ FieldsToDisplay + ' FROM ' + choose_object + ' WHERE AccountId =: recordId';
        }
        ReList = Database.query(SOQLquery);
        return ReList;
    }
}