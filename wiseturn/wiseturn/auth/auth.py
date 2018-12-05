from django.conf import settings
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import User

"""
check_password(password, encoded)[source]¶
If you’d like to manually authenticate a user by comparing a plain-text password to the hashed password in the database, use the convenience function check_password(). It takes two arguments: the plain-text password to check, and the full value of a user’s password field in the database to check against, and returns True if they match, False otherwise.

make_password(password, salt=None, hasher='default')[source]¶
Creates a hashed password in the format used by this application. It takes one mandatory argument: the password in plain-text. Optionally, you can provide a salt and a hashing algorithm to use, if you don’t want to use the defaults (first entry of PASSWORD_HASHERS setting). See Included hashers for the algorithm name of each hasher. If the password argument is None, an unusable password is returned (one that will never be accepted by check_password()).
"""