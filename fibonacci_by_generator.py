
class Fibonacci:
    def fibonacci(self):
        a, b = 0, 1
        counter = 1
        while counter < 15:
            yield print(a)
            a, b = b, a + b
            counter += 1


fi = Fibonacci().fibonacci()
for _ in range(0, 25):
    fi.__next__()
