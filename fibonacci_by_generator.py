class Python_For_Fun:
    def factoriel(self, n):
        if n <= 1:
            return 1
        else:
            return self.factoriel(n - 1) * n

    def print_factoriel_result(self, n):
        print(self.factoriel(n))

    def fibonacci(self, n):
        a, b = 0, 1
        counter = 0
        fibonacci_list = []
        while counter <= n:
            fibonacci_list.append(a)
            a, b = b, a + b
            counter += 1
        return fibonacci_list

    def print_fibonacci(self, n):
        print(self.fibonacci(n))


python_for_fun = Python_For_Fun()
python_for_fun.print_factoriel_result(6)
python_for_fun.print_fibonacci(30000)
