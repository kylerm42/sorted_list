class ListItemsController < ApplicationController
  def index
    @resources = ListItem.all

    render :index
  end

  def order
    params[:list_item_order] ||= []

    params[:list_item_order].each_with_index do |list_item_id, position|
      ListItem.find(list_item_id).update(position: position)
    end

    ListItem.where.not(id: params[:list_item_order]).update_all(position: nil)

    render nothing: true
  end
end
