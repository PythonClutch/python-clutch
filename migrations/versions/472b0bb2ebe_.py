"""empty message

Revision ID: 472b0bb2ebe
Revises: 3d7384fe644
Create Date: 2015-03-24 13:54:42.993467

"""

# revision identifiers, used by Alembic.
revision = '472b0bb2ebe'
down_revision = '3d7384fe644'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('submitted_by_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'project', 'user', ['submitted_by_id'], ['id'])
    op.drop_column('project', 'age')
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('age', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'project', type_='foreignkey')
    op.drop_column('project', 'submitted_by_id')
    ### end Alembic commands ###
