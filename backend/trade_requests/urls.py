from .views import TradeRequestViewSet
from rest_framework_nested import routers

router = routers.SimpleRouter()
router.register(r'trade_requests', TradeRequestViewSet, base_name='trade-requests')

urlpatterns = router.urls
