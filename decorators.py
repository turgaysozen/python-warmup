def split_hello(function):
    def wrapper():
        func = function()
        split_string = func.split()
        return split_string

    return wrapper


def lower_case(function):
    def wrapper(name1, name2):
        lower_name1 = name1.lower()
        lower_name2 = name2.lower()
        lowercase_names = function(lower_name1, lower_name2)
        return lowercase_names

    return wrapper


def capitalize(function):
    def wrapper(arg1, arg2):
        name1 = arg1.capitalize()
        name2 = arg2.capitalize()
        capitalize_names = function(name1, name2)
        return capitalize_names

    return wrapper


# @split_hello
@capitalize
# @lower_case
def hello(name1, name2):
    return 'Hello ' + name1 + ' and ' + name2


print(hello('turgay', 'artur'))
