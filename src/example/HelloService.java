package example;

public class HelloService {
	public String hello(String name) {
		try {
			// to see the loading status
			Thread.sleep(2000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return "Hello, " + name;
	}
	
}
