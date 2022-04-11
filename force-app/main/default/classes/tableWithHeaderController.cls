public with sharing class tableWithHeaderController{
    @AuraEnabled
    public static List<sObject> relatedRecords(Id recordId, String chosenObject, String fieldsToQuery, String orderField, String direction){
        List<sObject> queryList = new List<sObject>();
        String myQuery = null;
        if (orderField != null) {
            myQuery='Select '+ fieldsToQuery + ' FROM ' + chosenObject + ' WHERE AccountId =: recordId ORDER BY ' + orderField + ' ' + direction;
        }
        else {
            myQuery='Select '+ fieldsToQuery + ' FROM ' + chosenObject + ' WHERE AccountId =: recordId';
        }
        return Database.query(myQuery);
    }
}