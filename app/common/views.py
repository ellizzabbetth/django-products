from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView


from core.models import User
from .authentication import JWTAuthentication
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions

# Create your views here.
class RegisterAPIView(APIView):
    def post(self, request):
        data = request.data
        print(data)
        if data['password'] != data['password_confirm']:
            raise exceptions.APIException('Passwords do not match!')

        #data['is_ambassador'] = 'api/ambassador' in request.path

        serializer = UserSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise exceptions.AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise exceptions.AuthenticationFailed('Incorrect Password!')

        # scope can be ambassador or admin
        # scope = 'ambassador' if 'api/ambassador' in request.path else 'admin'

        # if user.is_ambassador and scope == 'admin':
        #     raise exceptions.AuthenticationFailed('Unauthorized')

        token = JWTAuthentication.generate_jwt(user.id)#, scope)

        response = Response()
        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'message': 'success'
        }

        return response


class UserAPIView(APIView):
    authentication_classes = [JWTAuthentication] # custome auth
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = UserSerializer(user).data

        # if 'api/ambassador' in request.path:
        #     data['revenue'] = user.revenue

        return Response(UserSerializer(request.user).data)