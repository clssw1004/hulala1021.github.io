package com.hulala.jt.demo1;

public class App {
	public static void main(String[] args) {
		final BlockingQueue<String> queue = new BlockingQueue<String>();
		//生产者线程
		Thread cosumer = new Thread(new Runnable() {
			@Override
			public void run() {
				System.out.println(queue.poll());
			}
		});
		cosumer.start();
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		//消费者线程
		Thread producer = new Thread(new Runnable() {
			@Override
			public void run() {
				queue.offer("I am here");
			}
		});
		producer.start();
	}
}