from rest_framework import serializers
from trade_requests.models import TradeRequest
from django.contrib.auth.models import User


class TradeRequestSerializer(serializers.ModelSerializer):
    # Write
    # created_by = serializers.PrimaryKeyRelatedField(
    #     queryset=User.objects,
    #     default=serializers.CurrentUserDefault(),
    # )
    # created_by_username = serializers.SerializerMethodField()
    # Readonly
    created_by = serializers.SerializerMethodField()
    target_owner = serializers.SerializerMethodField()
    target = serializers.SerializerMethodField()
    # book_title = serializers.CharField(source='target.title')
    # book_preview = serializers.CharField(source='target.preview_link')
    class Meta:
        model = TradeRequest
        fields = (
            'id', 'status', 'created_by',
            'target', 'target_owner', 'message',
        )
    def get_created_by(self, obj):
        return {
            'id': obj.created_by.id,
            'username': obj.created_by.username,
        }
    def get_target(self, obj):
        return {
            'id': obj.target.id,
            'title': obj.target.title,
            'link': obj.target.preview_link,
        }
    def get_target_owner(self, obj):
        return {
            'id': obj.target.owner.id,
            'username': obj.target.owner.username,
        }
class TradeRequestUpdateSerializer(TradeRequestSerializer):
    class Meta(TradeRequestSerializer.Meta):
        read_only_fields = (
            'id', 'created_by', 'target', 'created_at',
            'updated_at', 'message',
        )