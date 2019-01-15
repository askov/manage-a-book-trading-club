from rest_framework import serializers
from trade_requests.models import TradeRequest
from django.contrib.auth.models import User


class TradeRequestSerializer(serializers.ModelSerializer):
    created_by = serializers.PrimaryKeyRelatedField(
        queryset=User.objects,
        default=serializers.CurrentUserDefault(),
    )
    class Meta:
        model = TradeRequest
        fields = (
          'id', 'created_by', 'target', 'created_at',
          'updated_at', 'status', 'message',
        )

    # def create(self, validated_data):
    #     print('SERIALIZER create', validated_data)
    #     return TradeRequest(**validated_data)
    # def update(self, instance, validated_data):
    #     print('S UPDATE')
    #     instance.status = validated_data.get('status', instance.status)
    #     instance.save()
    #     return instance

class TradeRequestUpdateSerializer(TradeRequestSerializer):
    class Meta(TradeRequestSerializer.Meta):
        read_only_fields = (
            'id', 'created_by', 'target', 'created_at',
            'updated_at', 'message',
        )