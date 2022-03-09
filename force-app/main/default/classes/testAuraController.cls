@isTest
//обычно название тестовых классов идет "<Название класса>Test" для удобства поиска и понимания что они связанны
public class testAuraController {
    // когда есть больше одной функции в которой создаются начальные данные надо использовать функцию с аннотацияе @testSetup
    // если есть много тестовых классов в которых создаются начальные данные то создается фабрики https://trailhead.salesforce.com/content/learn/modules/apex_testing/apex_testing_data
    @isTest
    public static void testApex(){
        //зачем тебе и аккаунт и контакт? можно же просто на аккаунте это проернуть
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
        // раз сравниваешь то сравнивай уж число записей а не просто с пустотой
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
        // раз сравниваешь то сравнивай уж число записей а не просто с пустотой
        System.assert(testList != null);
        
    }
    
}