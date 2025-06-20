class SymbolWrapperType < ActiveRecord::Type::Value
  def serialize(value)
    value.to_s if value.present?
  end

  def deserialize(value)
    value&.to_sym
  end
end
