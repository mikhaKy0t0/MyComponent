@isTest
public class testAuraController {
    @isTest
    public static void testApex(){
        
        Account testAcc = new Account(Name = 'Account For Unit Test');
        insert testAcc;
        
        List<Contact> contacts = new List<Contact>();
        for (Integer count = 0; count < 20; count++) {
            contacts.add(new Contact (FirstName = 'First'+count, LastName ='Last'+count, AccountId = testAcc.Id));
        }
        insert contacts;
        
        String s = 'Id';
        String obj = 'contact';
        String order = 'Id';
        String direct = 'ASC';
        
        Test.startTest();
        	List<Contact> testList = AuraAccountController.RelatedListComp (testAcc.Id, obj, s, order, direct);
        Test.stopTest();
        System.assert(testList != null);
        
    }
    
        @isTest
    public static void testApexSecond(){
        
        Account testAcc = new Account(Name = 'Account For Unit Test');
        insert testAcc;
        
        List<Contact> contacts = new List<Contact>();
        for (Integer count = 0; count < 20; count++) {
            contacts.add(new Contact (FirstName = 'First'+count, LastName ='Last'+count, AccountId = testAcc.Id));
        }
        insert contacts;
        
        String s = 'Id';
        String obj = 'contact';
        String order = null;
        String direct = null;
        
        Test.startTest();
        	List<Contact> testList = AuraAccountController.RelatedListComp (testAcc.Id, obj, s, order, direct);
        Test.stopTest();
        System.assert(testList != null);
        
    }
    
}