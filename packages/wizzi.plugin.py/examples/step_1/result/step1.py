def Sum(a, b):
    return a + b
Sum (2,3)
class Dog:
    def __init__(self, name):
        self.name = name
    def Say(self, phrase):
        print ("Hii, i am " + self.name + " and say " + phrase)
    def __del__(self):
        print ('die')
dog1 = Dog('Fido')
dog1.Say ("Hello boys")
