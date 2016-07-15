package com.hulala.jt.demo1;

import java.util.LinkedList;
import java.util.Queue;

/**
 * 队列的实现，支持线程间安全的offer poll操作
 */
public class BlockingQueue<T> {
    private Queue<T> queue;

    public BlockingQueue() {
        queue = new LinkedList<T>();
    }

    /**
     * 向队列尾部添加一个对象
     * 
     * @param t
     * @return
     */
    public synchronized boolean offer(T t) {
        boolean res = queue.offer(t);
        this.notify();
        return res;
    }

    /**
     * 从队列头部取出一个对象
     * 
     * @return
     * @throws InterruptedException
     */
    public synchronized T poll() {
        if (queue.size() == 0) {
            System.out.println("wait data");
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return this.queue.poll();
    }

    /**
     * 返回队列长度
     * 
     * @return
     */
    public int size() {
        return this.queue.size();
    }
}