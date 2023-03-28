import java.io.*;
class MyFirstClass {
    public int Sum(int a, int b) {
        return a + b;
    }
    public static void main(String[] args) {
        MyFirstClass instance = new MyFirstClass();
        System.out.println (instance.Sum(42, 13));
    }
}
