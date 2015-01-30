$(function() {
  $('[data-toggle="tooltip"]').tooltip()

  // hide placeholder if unnecessary
  if ($('#list-sorting li').length != 1) {
    $('#list-item-placeholder').hide();
  };

  // dragging list items
  $('.list-origin-item').draggable({
    helper: 'clone',
    revert: 'invalid',
    connectToSortable: '#list-sorting'
  });
  $('.list-origin-item:data(item-draggable)').draggable('disable');

  // sorting the list
  $('#list-sorting').droppable({
    accept: ".list-origin-item",
    drop: function (event, ui) {
      $('[data-toggle="tooltip"]').tooltip()
      $('#list-item-placeholder').hide();

      //disable item from being dragged over twice
      var itemId = ui.draggable.data('list-item-id');
      var originItem = $('#list-origin').find('[data-list-item-id=' + itemId + ']:not(.ui-sortable-helper)');
      originItem.draggable('disable');

      //add button to remove item from sorted list
      ui.draggable.find('.btn').switchClass('hidden', 'show');
    }
  }).sortable({
    revert: true,
    containment: $('#panel-sorting')
  });

  // handle sorted list item removal
  $('#list-sorting').delegate('.remove-item-btn', 'click', function (event) {
    //re-enable dragging from item on the left
    var itemId = $(this).parent().data('list-item-id')
    var originItem = $('#list-origin').find('[data-list-item-id=' + itemId + ']')
    originItem.draggable('enable');

    //remove list item
    $(this).parent().tooltip('hide')
    $(this).parent().remove();

    // check if this is last item
    if ($('#list-sorting li').length === 1) {
      $('#list-item-placeholder').show();
    };
  });

  // saving list positions
  $('#list-save').click(function (event) {
    event.preventDefault();

    var listItemOrder = [];
    $('#list-sorting').children(':data(list-item-id)').each(function (idx) {
      listItemOrder.push($(this).data('list-item-id'))
    });

    $.post('/list_items/order', { 'list_item_order[]': listItemOrder }, function (data) {
      console.log('done!')
    })
  });
});
