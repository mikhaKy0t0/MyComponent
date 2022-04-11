public with sharing class tableWithHeaderController{
    @AuraEnabled(cacheable=true)
    public static List<sObject> relatedRecords(Id recordId, String chosenObject, String fieldsToQuery, String orderField, String direction){
        //System.debug(recordId + ' ' + chosenObject + ' ' + fieldsToQuery + ' ' + orderField + ' ' + direction);
        List<sObject> queryList = new List<sObject>();
        String myQuery = null;
        if (orderField != null) {
            myQuery='Select '+ fieldsToQuery + ' FROM ' + chosenObject + ' WHERE AccountId =: recordId ORDER BY ' + orderField + ' ' + direction;
        }
        else {
            myQuery='Select '+ fieldsToQuery + ' FROM ' + chosenObject + ' WHERE AccountId =: recordId';
        }
        queryList = Database.query(myQuery);
        //System.debug(queryList);
        return queryList;
    }
}