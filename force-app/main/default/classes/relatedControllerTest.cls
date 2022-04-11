@isTest
public class relatedControllerTest {

    /*@TestSetup static void makeData() {
    
    }*/

    @isTest public static void testApex() {
        // DataFactory - main
        Account testAcc = testDataFactory.createAccountWithConts(10);
        Test.startTest();
        	List<Contact> testList = relatedController.relatedRecords (testAcc.Id, 'contact', 'Id', 'Id', 'ASC');
        Test.stopTest();
        System.AssertEquals(testList.size(), 10);
        
    }

    @isTest public static void testApexSecond(){
        // Regular insert - second variant
        Account secondTestAcc = new Account(Name = 'Account For Unit Test');
        insert secondTestAcc;
        
        List<Contact> contacts = new List<Contact>();
        for (Integer count = 0; count < 20; count++) {
            contacts.add(new Contact (FirstName = 'First'+count, LastName ='Last'+count, AccountId = secondTestAcc.Id));
        }
        insert contacts;

        Test.startTest();
        	List<Contact> secondTestList = relatedController.relatedRecords (secondTestAcc.Id, 'contact', 'Id', null, null);
        Test.stopTest();
        System.AssertEquals(secondTestList.size(), 20);
        
    }
    
}